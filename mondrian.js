const svg = document.getElementById('art-display');

const size  = 320;
const white = '#F2F5F1';
const colors = ['#D40920', '#1356A2', '#F7D842'];

function buildGrid() { //Create grid of squares with random splits
  const step = size / 7; 
  let squares = [{ x: 0, y: 0, width: size, height: size }];

  function splitOnX(square, splitAt) {
    const a = { x: square.x, y: square.y, width: splitAt - square.x, height: square.height };
    const b = { x: splitAt, y: square.y, width: square.x + square.width - splitAt, height: square.height };
    squares.push(a, b);
  }

  function splitOnY(square, splitAt) {
    const a = { x: square.x, y: square.y, width: square.width, height: splitAt - square.y };
    const b = { x: square.x, y: splitAt, width: square.width, height: square.y + square.height - splitAt };
    squares.push(a, b);
  }

  function splitSquaresWith({ x, y }) {
    for (let i = squares.length - 1; i >= 0; i--) {
      const sq = squares[i];
      if (x && x > sq.x && x < sq.x + sq.width && Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(sq, x);
      } else if (y && y > sq.y && y < sq.y + sq.height && Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(sq, y);
      }
    }
  }

  for (let i = 0; i < size; i += step) {
    splitSquaresWith({ y: i });
    splitSquaresWith({ x: i });
  }

  return squares;
}

function drawNewComposition() {
  const squares = buildGrid();

  // assign random colors
  squares.forEach(s => delete s.color);
  colors.forEach(c => {
    squares[(Math.random() * squares.length) | 0].color = c;
  });

  // render as <rect>
  let markup = '';
  for (const s of squares) {
    const fill = s.color || white;
    markup += `<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}"
                 fill="${fill}" stroke="#000" stroke-width="8" shape-rendering="crispEdges"/>`;
  }
  svg.innerHTML = markup;
}

// first draw + regenerate on click
drawNewComposition();
svg.addEventListener('click', drawNewComposition);

// Code adapted from: https://generativeartistry.com/tutorials/piet-mondrian/