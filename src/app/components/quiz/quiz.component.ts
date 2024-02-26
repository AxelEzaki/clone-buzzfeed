import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public title: string = "";

  public questions: any;
  public questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false;

      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  public onClickResponder(resposta: string){
    this.answers.push(resposta);

    this.nextStep();
  }

  private async nextStep(){
    this.questionIndex += 1;

    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const modaFinal = await this.resultado(this.answers);

      this.answerSelected = quiz_questions.results[modaFinal as keyof typeof quiz_questions.results];
      this.finished = true;
    }
  }
  private async resultado(answers: string[]){
    const result = answers.reduce((anterior, atual, _, array) => {
      if(array.filter(item => item === anterior).length > array.filter(item => item === atual).length){
        return anterior;
      } else {
        return atual;
      }
    });

    return result;
  }

}
