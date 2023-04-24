# Boas vindas ao projeto Trybe Futebol Club!
  Projeto em grupo durante o curso de desenvolvimento web na trybe.
  
O TFC é um site informativo sobre partidas e classificações de futebol! soccer

No time de desenvolvimento do TFC, seu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, você vai construir um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento deve respeitar regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

## Habilidades
- Utilizar typescript: interface, classes, objetos...
- Utilizar ORM sequelize.
- Utilizar subir container utilizando docker.
- Utilizar modelagem de camadas model, service e controller.
- Utilizar errors, criar novos e trata-los.
- Utilizar middlewares de validações.
- Escrever testes para garantir que sua aplicação possua uma boa cobertura de testes.

## Veja o resultado a seguir do projeto pronto:
  ![exemplo do Pixel Art](./tfc.gif)

## Requisitos Obrigatorios:

    ✅ 1. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de times.
 
    ✅ 2. (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos em /app/backend/src, com um mínimo de 7 linhas cobertas.

    ✅ 3. Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente.
    
    ✅ 4. (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos em /app/backend/src, com um mínimo de 19 linhas cobertas.

    ✅ 5. Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico.

    ✅ 6. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias.

    ✅ 7. (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos em /app/backend/src, com um mínimo de 25 linhas cobertas.

    ✅ 8. Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end.
    
    ✅ 9. (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos em /app/backend/src, com um mínimo de 35 linhas cobertas.
    
    ✅ 10. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end.
    
    ✅ 11. (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos em /app/backend/src, com um mínimo de 45 linhas cobertas.
    
    ✅ 12. Desenvolva um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint /login/role no back-end de maneira que ele retorne os dados corretamente no front-end.
    
    ✅ 13. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de partidas.
    
    ✅ 14. (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos em /app/backend/src, com um mínimo de 70 linhas cobertas.
    
    ✅ 15. Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
        
    ✅ 16. Desenvolva o endpoint /matches de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end.
    
    ✅ 17. Desenvolva o endpoint /matches/:id/finish de modo que seja possível finalizar uma partida no banco de dados.
    
    ✅ 18. Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento.
          
    ✅ 19. (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos em /app/backend/src, com um mínimo de 80 linhas cobertas.
    
    ✅ 20. Desenvolva o endpoint /matches de modo que seja possível cadastrar uma nova partida em andamento no banco de dados.
        
    ✅ 21. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times.  
      
    ✅ 22. (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos em /app/backend/src, com um mínimo de 100 linhas cobertas.
    
    ✅ 23. Desenvolva o endpoint /leaderboard/home de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn.
    
    ✅ 24. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior.
        
    ✅ 25. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.  
      
    ✅ 26. Desenvolva o endpoint /leaderboard/away de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn.
    
    ✅ 27. Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior.
    
    ✅ 28. Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.
        
    ✅ 29. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados.   
      
    ✅ 30. (Bônus) Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC.
