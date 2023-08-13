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

  //Get Single Quiz
  public getSinleQuiz(quizId: number)
  {
     return this.http.get(`${baseUrl}/api/quiz/${quizId}`)
  }

  //update quiz
  public updateQuiz(quiz)
  {
    return this.http.put(`${baseUrl}/api/quiz`,quiz);
  }
  
  //Get quizzes of category
  public getQuizzesOfCategory(catergoryId)
  {
    return this.http.get(`${baseUrl}/api/categorysingle/${catergoryId}`)
  }

  //Get Active Quizzes
  public getActiveQuiz()
  {
    return this.http.get(`${baseUrl}/api/quiz/active`);
  }

  //Get Active Quizzes of category
  public getActiveQuizzesOfCategory(categoryId)
  {
     return this.http.get(`${baseUrl}/api/quiz/category/active/${categoryId}`);
  }
}
