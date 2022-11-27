## Personas

  * User
    * id
    * email
    * password
    * passwordResetToken
    * isAdmin
    * profile

  * Profile
    * id
    * cpf
    * completeName
    * birthDate
    * phone
    * avatar

  * Student
    * id
    * user
    * enrollments
    * educators

  * Educator
    * id
    * user
    * enrollments
    * students

  * Enrollment
    * id
    * title
    * description
    * modules
      * title
      * classes
    * students
    * educators

## Features

### Admin

  * [ ] Criar novo aluno
  * [ ] Criar novo professor
  * [ ] Criar novo curso
  * [ ] Criar modulos no curso
  * [ ] Criar aulas no curso
  
  * [ ] Pre matricular um aluno a um curso
  * [ ] Confirmar pre matricula de um aluno a um curso

  * [ ] Vincular um professor a um curso

  * [ ] Enviar convite para aluno por email
  * [ ] Enviar convite para professor por email


  * [ ] Ver listagem de alunos
  * [ ] Ver listagem de professores
  * [ ] Ver listagem de alunos por curso
  * [ ] Ver listagem de professores por curso


### Student

  * [ ] Ver listagem de cursos em que está cadastrado
  * [ ] Ver listagem de professores a quem estão vinculados

  * [ ] Marcar aula como assistida

### Educator

  * [ ] Ver listagem de cursos em que está cadastrado
  * [ ] Ver listagem de alunos que estão vinculados a ele

  * [ ] Criar modulos no curso
  * [ ] Criar aulas no curso
