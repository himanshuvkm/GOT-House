export type Option = {
    id: string;
    text: string;
};

export type Question = {
    id: number;
    question: string;
    options: Option[];
};

export const questions: Question[] = [
    {
        id: 1,
        question: "Your rival is secretly working to destroy you. What is your first instinct?",
        options: [
            { id: "A", text: "Expose them publicly and face them directly." },
            { id: "B", text: "Let them believe they are winning while you plan their downfall." }
        ]
    },
    {
        id: 2,
        question: "You gain a powerful secret that could change everything. What do you do?",
        options: [
            { id: "A", text: "Use it carefully to build alliances and long-term advantage." },
            { id: "B", text: "Use it immediately to take what you deserve." }
        ]
    },
    {
        id: 3,
        question: "Your people are suffering, and you must choose how to lead them.",
        options: [
            { id: "A", text: "Stand beside them, even if it costs you power." },
            { id: "B", text: "Make hard decisions that keep you in control." }
        ]
    },
    {
        id: 4,
        question: "Someone betrays you after swearing loyalty.",
        options: [
            { id: "A", text: "Cut them off and move on without revenge." },
            { id: "B", text: "Make sure they regret ever crossing you." }
        ]
    },
    {
        id: 5,
        question: "You are offered a chance to rule, but it requires bloodshed.",
        options: [
            { id: "A", text: "Refuse — some lines should not be crossed." },
            { id: "B", text: "Accept — power always demands sacrifice." }
        ]
    }
];
