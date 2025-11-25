export function DeputadoCard(deputado) {
    const card = document.createElement('div');
    card.className = 'deputado-card';
    
    // Frame pra a foto do deputado
    const photoFrame = document.createElement('div');
    photoFrame.className = 'deputado-photo-frame';
    
    const photoContainer = document.createElement('div');
    photoContainer.className = 'deputado-photo';
    
    if (deputado.url_foto) {
        const img = document.createElement('img');
        img.src = deputado.url_foto;
        img.alt = deputado.nome || 'Foto do deputado';
        img.onerror = function() {
            photoContainer.innerHTML = '<span class="material-symbols-outlined">person</span>';
        };
        photoContainer.appendChild(img);
    } else {
        photoContainer.innerHTML = '<span class="material-symbols-outlined">person</span>';
    }
    
    photoFrame.appendChild(photoContainer);
    
    // Informações
    const info = document.createElement('div');
    info.className = 'deputado-info';
    
    const name = document.createElement('h3');
    name.className = 'deputado-name';
    name.textContent = deputado.nome || 'Nome não disponível';
    
    const details = document.createElement('div');
    details.className = 'deputado-details';
    const parts = [];
    if (deputado.sigla_partido) parts.push(deputado.sigla_partido);
    if (deputado.sigla_uf) parts.push(deputado.sigla_uf);
    details.textContent = parts.join(' • ') || 'Sem informações';
    
    info.appendChild(name);
    info.appendChild(details);
    
    card.appendChild(photoFrame);
    card.appendChild(info);
    
    // Click handler
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.hash = `#/candidates/${deputado.id}`;
    });
    
    return card;
}