import icons from 'url:../../img/icons.svg';
import View from './View';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      
      const goToPage = +btn.dataset.goto;
      console.log('Button clicked, going to page:', goToPage);
      handler(goToPage);
    });
  }

  _getMarkup() {
    const numPages = Math.ceil(this._data.result.length / 10);
    console.log('Number of pages:', numPages);
    console.log('Data length:', this._data.result.length);

    // Generate pagination markup
    return this._generateMarkup(numPages);
  }

  _generateMarkup(numPages) {
    const curPage = this._data.page || 1; // Get current page from data
    console.log('Current page:', curPage, 'Total pages:', numPages);

    let markup = '';

    // Previous page button
    if (curPage > 1) {
      markup += `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Next page button
    if (curPage < numPages) {
      markup += `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    return markup;
  }
}

export default new paginationView();
