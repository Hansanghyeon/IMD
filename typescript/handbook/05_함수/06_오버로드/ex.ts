let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: {suit:string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x): any {
  // 객체 / 배열로 작업하고 있는지 확인해보세요
  // 그렇가면 그것들은 댁을 주고 사용자는 카드를 선택할 것입니다.
  if(typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard
  }
  // 그렇지 않으면 카드를 선택하게 하세요.
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13};
  }
}

let myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card:', pickedCard1.card, 'of', pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log('card:', pickedCard2.card, 'of', pickedCard2.suit);
