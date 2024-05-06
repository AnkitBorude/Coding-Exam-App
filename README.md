# CodingExamApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
To do:-

Now with each question the examination module will recieve the test case input and output data as well.
where when the user run the code the test_case_input would be appended to the stdin of the code and will check whether if the execution was successfull then the test_case_output should match the stdout. then the successfull message would be shown. 

we would maintain an internal data structure that would hold the each question's output and its correctness as required.then at the time of exam submission we would create a new result at backend and would push the datastructure as required.
where major drawback is that if the user closes the window then he/she would not be able to maintain the coding data as required. thank you.

Now some major tasks to be undertaken are as follows..

1)access each questions test_case_input and append it as stdin for code-->Done
2)check whether the question's test_case_output matches the stdout then show a message-->Done
3)When the exam starts then we should initialize the result object with exam_id and student_id. after with each submit code, we should append the answer within the answer array and at the time of exam submission the whole result object would be sent to backend for storage.--->Done
4)Implementing the exam time functionality and submission
    where showing the are you sure you want to submit the exam alertbox--->Done
    showing final screen after exam has been submitted and storing the result object in the database.
    refactoring the student cannot attempt the exam attempted before.--->Done
    showing admin the exam list and corresponding list of students -->Need to add demo results in the table for that purpose such that screens could be developed
    where each student will show the marks and exam details like code 