import icons from 'url:../../img/icons.svg';
import View from './View';

class paginationView extends View{
  _parentElement = document.querySelector('.pagination');
  
  _getMarkup(){
    const numPages = Math.ceil(this._data.length / 10);
    console.log('Number of pages:', numPages);
    console.log('Data length:', this._data.length);
    
    // Generate pagination markup
    return this._generateMarkup(numPages);
  }
  
  _generateMarkup(numPages) {
    const curPage = 1; // You'll need to track current page
    
    // Previous page button
    if (curPage > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    
    // Next page button
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    
    return '';
  }
}

export default new paginationView()