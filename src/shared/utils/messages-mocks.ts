import { Message } from "../components/chat/mui/chat-types";


export const messagesMock: Message[] = [
    {
        content: "Olá tudo bem ? ",
        type: 'text',
        self: false,
        createdAt: new Date('2021-09-12 13:36:19'),
    },
    {
        content: "Beleza ",
        type: 'text',
        self: true,
        createdAt: new Date('2021-09-12 13:37:19'),
    },
    {
        content: "Como anda as coisas ",
        type: 'text',
        self: true,
        createdAt: new Date('2021-09-12 13:38:19'),
    },
    {
        content: "Tudo tranquilo, só vivendo ",
        type: 'text',
        self: false,
        createdAt: new Date('2021-09-12 13:39:19'),
    },
]