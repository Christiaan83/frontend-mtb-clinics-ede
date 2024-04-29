function changeDifficultyName(difficulty) {
    switch (difficulty) {
        case 'EASY':
            return 'Makkelijk';
        case 'MODERATE':
            return 'Gemiddeld';
        case 'DIFFICULT':
            return 'Moeilijk';
    }
}

export default changeDifficultyName;