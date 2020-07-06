import { OrxeRatingBar } from '../index';
import {toHaveTextContent, toHaveAttribute} from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveTextContent, toHaveAttribute });

describe('orxe-rating-bar', () => {
  let ratingBar;

  beforeEach(async function() {
    OrxeRatingBar;

    ratingBar = document.createElement('orxe-rating-bar') as OrxeRatingBar;
    await document.body.append(ratingBar);
  });

  afterEach(async function() {
    await ratingBar.remove();
  });

  /**
   * Function that sets properties on the Custom Element.
   */
  async function setProperties(properties: object): Promise<void> {
    for (const property in properties) {
      if (ratingBar.hasOwnProperty(property)) {
        ratingBar[property] = properties[property];
      }
    }
    await ratingBar.requestUpdate();
  }

  /**
   * Function that returns an element containing the testId data attribute.
   */
  function getByTestId(id: string): HTMLElement {
    return ratingBar.shadowRoot!.querySelector(`[data-testid=${id}]`) as HTMLElement;
  }

  it('should check default values of properties', async () => {
    expect(ratingBar.type).toEqual('linear');
    expect(ratingBar.rating).toEqual(0);
    expect(ratingBar.label).toBeFalsy();
  });

  it('check Rating for Linear rating bar', async () => {
    await setProperties({ rating: 70 });
    const ratingValue = getByTestId('linear-rating-value');
    expect(ratingValue).toHaveTextContent('7');
  });

  it('check Rating for Decimal Input values for Linear Rating Bar', async () => {
    await setProperties({ rating: 95.26, type: 'linear' });
    const linearRating = getByTestId('linear-rating-value');
    expect(linearRating).toHaveTextContent('9.5');
  });

  it('check if aria-label attribute is present', () => {
    ratingBar.setAttribute('aria-label', 'Linear Rating Bar');
    expect(ratingBar).toHaveAttribute('aria-label', expect.stringContaining('Linear Rating Bar'));
  });
});
