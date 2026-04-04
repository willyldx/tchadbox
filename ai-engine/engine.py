import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random

class RecommendationEngine:
    def __init__(self):
        self.df = None
        self.cosine_sim = None
        self.is_ready = False
        
    def fit(self, products_list):
        """
        Takes a list of product dictionaries and builds the similarity matrix.
        """
        if not products_list:
            self.is_ready = False
            return
            
        self.df = pd.DataFrame(products_list)
        
        # We need a combination of text features to build a good context vector
        # Fill missing values
        for col in ['title', 'subtitle', 'description', 'category']:
            if col in self.df.columns:
                self.df[col] = self.df[col].fillna('')
            else:
                self.df[col] = ''
                
        # Create a "soup" of metadata for TF-IDF
        self.df['metadata_soup'] = (
            self.df['category'] * 2 + " " + # Weight category heavily
            self.df['title'] + " " + 
            self.df['subtitle'] + " " + 
            self.df['description']
        )
        
        # Convert to lowercase
        self.df['metadata_soup'] = self.df['metadata_soup'].str.lower()
        
        # Instantiate Vectorizer
        tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 2), min_df=1, stop_words='english')
        
        # Build Matrix
        tfidf_matrix = tf.fit_transform(self.df['metadata_soup'])
        
        # Compute Cosine Similarity Matrix
        self.cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        self.is_ready = True

    def recommend(self, viewed_ids, viewed_categories=None, top_k=4):
        """
        Returns top_k product IDs based on the provided IDs.
        """
        if not self.is_ready or self.df is None or self.df.empty:
            return []
            
        # Ensure we only use valid IDs that exist in the dataframe
        valid_ids = [pid for pid in viewed_ids if pid in self.df['id'].values]
        
        if not valid_ids:
            return self.get_random_fallback(top_k)
            
        # Get the dataframe indices of the viewed products
        indices = self.df[self.df['id'].isin(valid_ids)].index.tolist()
        
        # Sum the similarity scores for all viewed products to create a combined profile
        sim_scores = np.zeros(len(self.df))
        for idx in indices:
            sim_scores += self.cosine_sim[idx]
            
        # Average the scores
        sim_scores = sim_scores / len(indices)
        
        # Enumerate to get (index, score) pairs
        sim_scores = list(enumerate(sim_scores))
        
        # Sort the products based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # We want to exclude the products that the user has already viewed!
        recommendation_indices = []
        for i, score in sim_scores:
            if i not in indices:
                recommendation_indices.append(i)
            if len(recommendation_indices) >= top_k:
                break
                
        # Return the IDs
        recommended_ids = self.df.iloc[recommendation_indices]['id'].tolist()
        return recommended_ids

    def get_random_fallback(self, top_k=4):
        if not self.is_ready or self.df is None or self.df.empty:
            return []
        
        # Fallback to random currently active products, maybe favor instock
        active_df = self.df
        if 'is_active' in self.df.columns:
            active_df = self.df[self.df['is_active'] == True]
            
        if active_df.empty:
            return []
            
        sample_size = min(top_k, len(active_df))
        return active_df['id'].sample(n=sample_size).tolist()
