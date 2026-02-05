type PollType = 'restaurant' | 'menu_item' | 'neighbourhood';

export function generatePoll(type: PollType) {
  if (type === 'restaurant') {
    return {
      question: "What's your favourite Ottawa restaurant right now?",
      options: ['Yorgo’s', 'The Third', 'Mahal Tanjore', 'Shawarma & Pizza Palace', 'OB&O'],
    };
  }

  if (type === 'menu_item') {
    return {
      question: 'What are you ordering tonight?',
      options: ['Beef shawarma poutine', 'Smash burger', 'Dosa', 'Jollof rice'],
    };
  }

  return {
    question: 'Where should I eat next?',
    options: ['Glebe', 'Hintonburg', 'Baseline', 'Pineview', 'Russell Rd'],
  };
}
