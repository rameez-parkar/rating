import { html, customElement, property, TemplateResult, LitElement } from 'lit-element';
import styles from './rating-bar-css';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';

@customElement('orxe-rating-bar')
export class OrxeRatingBar extends LitElement {

  @property({ type: String, reflect: true })
  type = 'linear';

  @property({ type: Number, reflect: true })
  rating = 0;

  @property({ type: String, reflect: true })
  label = '';

  private convertedRating = 0;

  static styles = styles;

  render() {
    this.convertedRating = this.getConvertedRating();
    return html`
      ${this._renderRatingBar()}
    `;
  }

  getConvertedRating(): number {
    return !this.rating ? 0 : this.rating > 100 ? 10 : this.rating < 0 ? 0 : Math.floor(this.rating) / 10;
  }

  private _showProgress(): Record<string, string> {
    const progress = {};
      if (this.rating > 100) {
        progress['width'] = '100%';
      } else if (this.rating < 0) {
        progress['width'] = '0%';
      } else {
        progress['width'] = this.rating + '%';
      }
      return progress;
  }

  private _renderRatingBar(): TemplateResult {
      return html`
        <div class="linear-track">
          <div
            style=${styleMap(this._showProgress())}
            class="${classMap({
        'linear-track__indicator': true,
        'linear-track--bad': this.convertedRating >= 1 && this.convertedRating < 3,
        'linear-track--poor': this.convertedRating >= 3 && this.convertedRating < 5,
        'linear-track--average': this.convertedRating >= 5 && this.convertedRating < 7,
        'linear-track--great': this.convertedRating >= 7 && this.convertedRating < 8.5,
        'linear-track--excellent': this.convertedRating >= 8.5,
      })}"
          ></div>
        </div>
        <div class="linear-track__info">
          <span data-testid="linear-rating-label">${this.label}</span>
          <span data-testid="linear-rating-value">${this.convertedRating}</span>
        </div>
      `;
  }
}
