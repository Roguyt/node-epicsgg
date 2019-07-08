import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';

export default class User {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public getOwnedCards(userId: number, collectionId: number): Promise<Card[]> {
        return this.baseClient
            .get('collections/' + collectionId + '/users/' + userId + '/owned2?categoryId=1&gameId=1')
            .then(
                (result): Promise<Card[]> => {
                    return new Promise((resolve): void => {
                        const data: Card[] = [];

                        for (let i = 0; i < result.cards.length; i += 1) {
                            let card = result.cards[i];
                            let cardData: Card = CardUtils.createACard(card);

                            data.push(cardData);
                        }

                        resolve(data);
                    });
                }
            );
    }
}
