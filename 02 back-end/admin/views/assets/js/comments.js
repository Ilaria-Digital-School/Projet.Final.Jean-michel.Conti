document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentContent');
    const commentList = document.getElementById('commentList');
    const artworkId = document.getElementById('artworkId').value;

    // Charger les commentaires
    async function loadComments() {
        try {
            const response = await fetch(`/comments?artworkId=${artworkId}`);
            const comments = await response.json();
            
            commentList.innerHTML = comments.map(c => `
                <div class="comment-item mb-4 p-3 border-bottom border-secondary">
                    <div class="d-flex justify-content-between">
                        <strong class="text-warning">${c.user?.email || c.admin?.email || 'Anonyme'}</strong>
                        <small class="text-secondary">${new Date(c.createdAt).toLocaleDateString()}</small>
                    </div>
                    <p class="mt-2 mb-1">${c.content}</p>
                    ${isAdminOrOwner(c) ? `<button class="btn btn-sm btn-outline-danger mt-2" onclick="deleteComment(${c.id})">Supprimer</button>` : ''}
                </div>
            `).join('');
        } catch (error) {
            console.error('Erreur chargement commentaires:', error);
        }
    }

    // Fonction pour vérifier si l'utilisateur peut supprimer (simulée côté client, validée côté serveur)
    function isAdminOrOwner(comment) {
        // Cette info devrait venir d'un state global ou d'un cookie décodé
        // Pour l'instant, on laisse l'UI afficher si l'admin est connecté (à affiner)
        return false; 
    }

    // Poster un commentaire
    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = commentInput.value.trim();
            if (!content) return;

            try {
                const response = await fetch('/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content,
                        artworkId: parseInt(artworkId)
                    })
                });

                if (response.ok) {
                    commentInput.value = '';
                    loadComments();
                } else if (response.status === 401) {
                    alert('Veuillez vous connecter pour commenter.');
                    window.location.href = '/auth/login';
                } else {
                    const err = await response.json();
                    alert(err.message || 'Erreur lors de l\'envoi');
                }
            } catch (error) {
                console.error('Erreur envoi commentaire:', error);
            }
        });
    }

    window.deleteComment = async (id) => {
        if (!confirm('Supprimer ce commentaire ?')) return;
        try {
            const response = await fetch(`/comments/${id}`, { method: 'DELETE' });
            if (response.ok) {
                loadComments();
            } else {
                alert('Action non autorisée');
            }
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };

    loadComments();
});
