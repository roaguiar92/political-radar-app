import { Button } from './button-component.js';

export function Pagination({ currentPage, totalPages, onPageChange }) {
    const container = document.createElement('div');
    container.className = 'pagination-container';
    
    if (totalPages <= 1) return container;
    
    // Botão Anterior
    const prevBtn = Button({
        text: '<',
        className: 'pagination-btn',
        type: 'button'
    });
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => onPageChange(currentPage - 1);
    container.appendChild(prevBtn);
    
    // Removi o número de páginas para simplificar a interface.

    
    // Botão Próximo
    const nextBtn = Button({
        text: 'Ver Mais',
        className: 'pagination-btn',
        type: 'button'
    });
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => onPageChange(currentPage + 1);
    container.appendChild(nextBtn);
    
    return container;
}