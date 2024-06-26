# Definições

# Blob (Binary Large Object)
Tipo de dado que armazena informação binária. Pode incluir arquivos complexos como vídeos ou imagens

# OAauth 2.0

OAuth é a abreviação de Open Authorization. É uma norma que permite uma aplicação acessar recursos hospedados por outra aplicação mediante necessidade do usuário.

É um protocolo de AUTORIZAÇÃO e não de autenticação, então ele foi feito principalmente para ser um meio de garantir acesso para um conjunto de recursos, como APIs remotas e dados de usuário.

O OAuth 2.0 surgiu em 2012, substituindo a versão anterior. Ele utiliza **Acess tokens**, um dado que representa a autorização para acessar recursos no interesse do usuário.

Ele não define um formato específico, mas é comum o JSON Web Token (JWT) ser utilizado em alguns casos.

Existe a importante definições dos papéis dos sujeito envolvidos nesse protocolo:

- **Resource owner**: o usuário ou sistema dono dos recursos protegidos e que pode garantir acesso à eles.
- **Cliente**: o sistema que solicita acesso aos recursos protegidos.
- **Authorizantion Server**: recebe pedidos do cliente para obter Acess Tokens e os concede mediante autenticação válida e permissão do Resource Owner
- **Resource Server**: Um server que protege os recursos do usuário e recebe pedidos de acesso do cliente. Ele aceita e valida uma acess token do cliente e retorna os recursos apropriados.

Escopo

Grant: passos que um cliente deve fazer para conseguir autorização de acesso a um recurso. Eu poderia chamar de "flow". Alguns deles são:
Authorization code

# URI vs URL

O URL (Uniform Resource Locator) indica a localização de um recurso na Internet.
Já o URI (Uniform Resource Identifier) pode ser usado para identificar qualquer tipo de recurso, como um livro em uma biblioteca.

# Objeto Request (da Fetch Api)
Propriedades:
- method
- headers
- url
- context
- referrer
- referrerPolicy
- mode
- credentials
- redirect
- integrity
- cache
- body (quando implementa)

Métodos
- clone
- json
- text
- blob
- formData
- json
- arrayBuffer

# Objeto NextRequest
Usa o Request padrão como base e implementa metódos próprios, todos ligados a cookies

# Objeto Response (da Fetch Api)
Propriedades:
- headers
- ok: booleano
- redirected
- status (ex.: 200, 300)
- statusText (ex.: 'OK' para 200)
- type (basic, cors)
- url
- body
  
Métodos
- clone
- json
- text
- blob
- formData
- json
- arrayBuffer

# Objeto NextResponse da next.js 
Métodos adicionados além dos relacionados a cookies:
- json
- redirect: produz uma resposta que redireciona a um URL

# Comandos
## fetch (resource, options)
### resource
- Uma string ou qualquer objeto que possui um stringfier (função do objeto que retorna uma string ligada a ele), como um url
- Um Request

### options
contém configurações customizadas para aplicar a um request.

Nativas:
- options.attributionReporting
- options.body: passado em um request do tipo POST, não podendo estar em um do tipo GET ou HEAD. Pode conter:
  - Blob
  - ArrayBuffer
  - TypedArray
  - FormData
  - DataView
  - URLSearchParams
- options.cache
- options.credentials
- options.headers
  - Authorization:
  - geralmente enviado após o user agent primeiro tenta requerir um recurso protegido sem credenciais. Nesse exemplo, o server responde com um código 401 Unauthorized e informa como autorizar <br>
  com um `WWW-Authenticate` reponse header contendo ao menos um challenge (metódo ou esquema de autenticação HTTP)
  - 
  - Esse cabeçalho é retirado de redirecionamentos de origem cruzada (cross-origin redirects)

Extendidas pelo next.js:
- options.next.revalidate
- options.next.tags
  
## Função headers() next.js
Usa como base o atributo headers já existente no objeto Request 


