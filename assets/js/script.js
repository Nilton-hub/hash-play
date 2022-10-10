const cells = document.querySelectorAll('.hash-container div');
const modal = document.querySelector('dialog');
const restart = document.querySelector('button.restart');
let check;

let play1 = '';

while (true) {
    play1 = window.prompt('Você é X ou O? (S para Sair)');
    // play1 = 'X';
    if (play1)
        play1 = play1.toLocaleUpperCase();
    if (play1 === 'S') {
        play1 = ''
        break;
    }
    if (['X', 'O'].includes(play1)) {
        break;
    }
}

function toPlay() {
    if (!play1)
        return
    let play2 = play1 === 'O' ? 'X' : 'O';
    let play = play1;
    let hash = [];
    for (let i = 0; i < cells.length; i++) {
        hash.push('');
    }

    let win = null;
    cells.forEach((cell, index) => {
        check = e => {
            hash[index] = play;
            win = verifyWin(hash, play)
            if (win !== null && win.includes(index)) {
                cell.textContent = play;
                win.forEach(w => {
                    cells[w].classList.add('emphasis');
                });
                document.querySelector('section.hash-container').classList.add('game-over');
                modal.showModal();
                modal.querySelector('p').innerHTML = 
                    `${play === 'X' ? 'O' : 'A' } <b style="color: blue;">${play}</b> ganhou!`;
                modal.querySelector('button').onclick = () => modal.close();

            } else if (win === null) {
                cell.textContent = play;
                play = play === 'O' ? 'X' : 'O';
            }
            cell.removeEventListener('click', check);
        };
        cell.addEventListener('click', check);
    });
}
function verifyWin(hash, opt) {
    if (hash[0] === opt && hash[1] === opt && hash[2] === opt) {
        return [0, 1, 2];
    } else if (hash[3] === opt && hash[4] === opt && hash[5] === opt) {
        return [3, 4, 5];
    } else if (hash[6] === opt && hash[7] === opt && hash[8] === opt) {
        return [6, 7, 8];
    } else if (hash[0] === opt && hash[3] === opt && hash[6] === opt) {
        return [0, 3, 6];
    } else if (hash[1] === opt && hash[4] === opt && hash[7] === opt) {
        return [1, 4, 7];
    } else if (hash[2] === opt && hash[5] === opt && hash[8] === opt) {
        return [2, 5, 8];
    } else if (hash[0] === opt && hash[4] === opt && hash[8] === opt) {
        return [0, 4, 8];
    } else if (hash[2] === opt && hash[4] === opt && hash[6] === opt) {
        return [2, 4, 6];
    }
    return null;
}

if (play1)
    toPlay();

restart.onclick = () => {
    window.location.reload();
};
