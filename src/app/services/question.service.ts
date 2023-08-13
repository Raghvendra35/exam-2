import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService 
{

  constructor(private http: HttpClient) { }


  public getQuestionOfQuiz(qId)
  {
    return this.http.get(`${baseUrl}/api/question/quiz/all/${qId}`);
  }


  public getQuestionOfQuizForTest(qId)
  {
    return this.http.get(`${baseUrl}/api/question/quiz/${qId}`);
  }


  //Add Question
  public addQuestion(question)
  {
   return this.http.post(`${baseUrl}/api/question`, question);
  }

  //delete Question
  public deleteQuestion(questionId: any)
  {
    return this.http.delete(`${baseUrl}/api/question/${questionId}`);
  }

  //
}
