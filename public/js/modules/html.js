/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
export function renderGroups(cardArr, dest) {
  dest.innerHTML = '';
  cardArr.forEach((cObj) => {
    const card = createCard(cObj);
    dest.append(card);
  });
}
