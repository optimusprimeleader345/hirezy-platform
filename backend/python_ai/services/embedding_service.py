import numpy as np
from typing import List, Union

try:
    from sentence_transformers import SentenceTransformer
    HAS_TRANSFORMERS = True
except ImportError:
    HAS_TRANSFORMERS = False

class EmbeddingService:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Initialize the embedding service with a lightweight model.
        Default: all-MiniLM-L6-v2 (fast and efficient for CPU)
        """
        self.model_name = model_name
        self._model = None

    @property
    def model(self):
        if self._model is None and HAS_TRANSFORMERS:
            self._model = SentenceTransformer(self.model_name)
        return self._model

    def get_embedding(self, text: str) -> List[float]:
        """
        Convert text to an embedding vector.
        """
        if not HAS_TRANSFORMERS:
            # Fallback/Mock embedding if sentence-transformers is not installed
            # This allows the system to remain pluggable/testable
            return self._generate_mock_embedding(text)
        
        embedding = self.model.encode(text)
        return embedding.tolist()

    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Batch convert list of texts to embeddings.
        """
        if not HAS_TRANSFORMERS:
            return [self._generate_mock_embedding(t) for t in texts]
        
        embeddings = self.model.encode(texts)
        return embeddings.tolist()

    def compute_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """
        Compute cosine similarity between two vectors.
        Returns a score between 0 and 1.
        """
        v1 = np.array(vec1)
        v2 = np.array(vec2)
        
        norm1 = np.linalg.norm(v1)
        norm2 = np.linalg.norm(v2)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
            
        return float(np.dot(v1, v2) / (norm1 * norm2))

    def _generate_mock_embedding(self, text: str) -> List[float]:
        """
        Generates a deterministic mock embedding based on text hash.
        Used only when sentence-transformers is unavailable.
        """
        import hashlib
        # Create a 384-dimensional vector (same as MiniLM)
        hash_val = int(hashlib.md5(text.encode()).hexdigest(), 16)
        rng = np.random.default_rng(hash_val % (2**32))
        return rng.standard_normal(384).tolist()

# Global instance for easy access
embedding_service = EmbeddingService()
