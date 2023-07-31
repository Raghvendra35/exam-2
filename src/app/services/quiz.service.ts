import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  //Get quiz
  public quizzes()
  {
    return this.http.get(`${baseUrl}/api/quizall`);
  }

  //Add Quiz
  public addNewQuiz(quiz: any)
  {
    return this.http.post(`${baseUrl}/api/quiz`,quiz);
  }

  //Delete Single Quiz
  public deleteSingleQuiz(quizId: any)
  {
   return this.http.delete(`${baseUrl}/api/quiz/${quizId}`);
  }
}
