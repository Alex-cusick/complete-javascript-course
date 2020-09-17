(function () {
    var score = 0;

    var question = function (questionHead, answers, correct) {
        this.questionHead = questionHead;
        this.answers = answers;
        this.correct = correct;
    }

    question.prototype.ask = function () {
        let n = '';
        for (let i = 0; i < this.answers.length; i++) {
            n = n.concat('\n   ' + (i+1) + ': ' + this.answers[i]);
        }  
        console.log(n);
        var answer = prompt(this.questionHead + n + '\n\nSelect answer\'s position');
        return answer;
    }

    question.prototype.check = function (ans) {
        return (this.correct == (ans - 1));
    }
    
    var que1 = new question("Which is 3?", ["13", "1", "2", "3"], 3); //Zero start
    var que2 = new question("How many letters are in 'house'?", ["5 letters", "6 letters", "4 letters", "3 letters"], 0);
    var que3 = new question("How many questions can I come up with", ["1 question", "2 questions", "3 questions"], 2);

    var quizList = [que1, que2, que3];
    var originalLength = quizList.length

    function askQuestion() {
        let num = Math.floor(Math.random() * quizList.length)
        let x = quizList[num];
        var answered = x.ask();
        let y = x.check(answered);
        console.log(y);
        if (y) {
            score++;
            prompt('Corret!\nYour score is now: ' + score + ' points\n\n    Continue?');
        } else {
            prompt('Incorrect\nYour score is: ' + score + ' points\n\n    Continue?');
        }     
        quizList.splice(num, 1);
        console.log(quizList);
    }

    for (let i = 0; i < quizList.length;i) {
        askQuestion();
    }

    if (quizList.length === 0) {
        prompt("Quiz complete!\n\n   Final score: "+ score + " out of " + originalLength + "\n\nThanks for playing!");
    }
})()