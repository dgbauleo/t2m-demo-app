# InGaia Temperature2Music App

O backend foi criado utilizando o framework Express com EJS para a renderização dos templates.  
Para o frontend foi utilizado o Bootstrap. Não havia necessidade de nenhum stack mais complexo devido à simplicidade do app.

## Integrações:
  - Geocode.xyz para fazer a geocodificação direta (Localização -> Coordenadas)
  - OpenWeatherMap para buscar a temperatura da localização especificada
  - Napster para retornar as músicas top 20 do gênero em questão

## Endpoints disponíveis:
  - GET /tracks/[genero]: Retorna as músicas do top 20 do Napster para o estilo especificado (funciona com pop, rock e classical)
  - GET /weather/[lat]/[lng]: Retorna a temperatura da coordenada especificada
  - GET /weather/[localização]: Retorna a temperatura da localização especificada
  - GET /listen/[localização]: Retorna as músicas do top 20 do gênero correspondente à temperatura da cidade informada

## Páginas criadas:
  - GET /: Página principal. Tenta pegar a localização atual com geocoding para preencher o formulário.
  - POST /: Precisa receber 3 parâmetros POST: lat, lng e cidade. Exibe a temperatura da cidade indicada e uma lista com as músicas do gênero correspondente.
  
## Executando em ambiente local:
  - Clonar o repositório em alguma pasta: git clone https://github.com/dgbauleo/ingaia-t2m.git
  - Instalar as dependências: npm install
  - Executar o servidor de desenvolvimento: node app.js
  - Abrir o navegador na URL http://127.0.0.1:3000

## Testando online:
  - O app está configurado no Heroku na URL https://ingaia-t2m.herokuapp.com
  - Qualquer push no repositório dispara um novo deploy
  - O ambiente de 
  
## Performance
  - Relatório do Load Test: https://a.blazemeter.com/app/?public-token=OF1AtjOVMX381ioiFb4VxZurO3hi2tZ8avT1AiRfFs25Cn4QRe#/accounts/420431/workspaces/419461/projects/512092/masters/25029378/summary
  - Teste com máximo de 30 usuários
  - Média de 300 hits/s
  - Média de 88,84ms por requisição
  
  
