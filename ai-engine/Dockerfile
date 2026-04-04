FROM python:3.11

WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Installer d'abord les dépendances pour optimiser le cache Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Exposer le port de l'application
EXPOSE 8001

# Lancer FastAPI avec Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
