# Configuração do Ambiente para o ERP de Consultório

## 1. Preparação do Ambiente
Antes de começar o desenvolvimento, é necessário configurar algumas ferramentas:

### ✅ Instalar Node.js (se ainda não tiver)
Baixe e instale o Node.js (recomendo a versão LTS).
Após a instalação, verifique se está funcionando:

```sh
node -v
npm -v
```

### ✅ Instalar um gerenciador de pacotes
Se quiser usar Yarn, instale com:

```sh
npm install -g yarn
```
Caso queira manter o npm, já vem incluso no Node.js.

### ✅ Instalar um banco de dados
- Se optar por **PostgreSQL**, baixe [aqui](https://www.postgresql.org/download/).
- Se preferir **MongoDB**, baixe [aqui](https://www.mongodb.com/try/download/community).

## 2. Criar o Backend (Node.js + NestJS)
Agora, vamos configurar a API para o backend usando NestJS.

### 1️⃣ Instale o CLI do NestJS:
```sh
npm install -g @nestjs/cli
```

### 2️⃣ Crie o projeto:
```sh
nest new backend
cd backend
npm run start:dev
```

### 3️⃣ Instale as dependências básicas:
```sh
npm install @nestjs/typeorm typeorm pg bcryptjs @nestjs/jwt @nestjs/passport passport passport-jwt dotenv
```

### 4️⃣ Crie um arquivo `.env` para armazenar configurações sensíveis:
```sh
touch .env
```

#### Exemplo de `.env`:
```ini
DATABASE_URL=postgres://user:password@localhost:5432/erp_db
JWT_SECRET=seu_segredo
PORT=3001
```

### 5️⃣ Conecte ao banco de dados PostgreSQL com TypeORM.

## 3. Criar o Frontend (React/Next.js)
Agora, configuramos a interface do usuário.

### 1️⃣ Instale o Create Next App:
```sh
npx create-next-app frontend
cd frontend
```

### 2️⃣ Instale as dependências essenciais:
```sh
npm install axios react-query tailwindcss
```

### 3️⃣ Configure o Tailwind CSS:
```sh
npx tailwindcss init -p
```

### 4️⃣ Adicione o Tailwind ao `tailwind.config.js`:
```js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### 5️⃣ Adicione estilos globais em `styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6️⃣ Rode o projeto para testar:
```sh
npm run dev
```

## 4. Configurar Autenticação (JWT + Passport)
No backend, crie um módulo de autenticação.

### 1️⃣ Gere o módulo e serviço de autenticação:
```sh
nest generate module auth
nest generate service auth
nest generate controller auth
```

### 2️⃣ Implemente JWT para autenticação.

## 5. Criar Modelos de Usuário e Consultas
Agora, criamos os modelos para pacientes e médicos usando TypeORM.

### 1️⃣ Crie a entidade `User`:
```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'doctor' | 'patient';

  @CreateDateColumn()
  createdAt: Date;
}
```

### 2️⃣ Crie a entidade `Appointment`:
```ts
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  patient: User;

  @ManyToOne(() => User, (user) => user.id)
  doctor: User;

  @Column()
  date: Date;

  @Column()
  status: 'scheduled' | 'completed' | 'canceled';
}
```

## 6. Criar Rotas no Backend
Crie rotas para autenticação e gerenciamento de consultas.

### Exemplo de rota para login no `auth.controller.ts`:
```ts
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

## 7. Criar a Interface de Agendamento no Frontend
- Utilize **React Query** para fazer chamadas à API.
- Utilize **react-calendar** ou **fullcalendar** para exibir os horários.
- Integre ao backend.

## 8. Configurar Notificações via WhatsApp API
- Use **Twilio** ou a **API oficial do WhatsApp**.
- Configure o webhook para disparar mensagens automáticas de lembrete.

---
Agora que o ambiente está configurado, podemos ir implementando cada funcionalidade! 🚀