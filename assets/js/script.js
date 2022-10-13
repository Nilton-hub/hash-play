const cells = document.querySelectorAll('.hash-container div');
const modalRestart = document.querySelector('dialog.play-restart');
const restart = document.querySelector('button.restart');
const pTurn = document.querySelector('p.turn');
const modalUserOption = document.querySelector('dialog.user-option');
const userOptions = modalUserOption.querySelectorAll('input[type="radio"]');
let check;

modalRestart.querySelector('button').onclick = () => modalRestart.close();
window.onload = () => {
    modalUserOption.showModal();
}

let play1 = '';

userOptions.forEach(option => {
    option.addEventListener('change', () => {
        play1 = option.value;
        if (play1)
            toPlay();
        modalUserOption.close();
    });
});

function toPlay() {
    if (!play1)
        return
    let play2 = play1 === 'O' ? 'X' : 'O';
    let play = play1;
    pTurn.textContent = `Vez da jogada: ${play}`;
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
                modalRestart.showModal();
                modalRestart.querySelector('p').innerHTML = 
                    `${play === 'X' ? 'O' : 'A' } <b style="color: blue;">${play}</b> ganhou!`;
                pTurn.textContent = '';
            } else {
                cell.textContent = play;
                play = play === 'O' ? 'X' : 'O';
                pTurn.textContent = `Vez da jogada: ${play}`;
            }
            if (win === null && !hash.includes('')) {
                modalRestart.showModal();
                modalRestart.querySelector('p').innerHTML = 'Empate!';
                pTurn.textContent = '';
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

restart.onclick = () => {
    window.location.reload();
};
