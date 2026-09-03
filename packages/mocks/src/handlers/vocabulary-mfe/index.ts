import {
    deleteByIdHandler,
    updateHandler,
    getByIdHandler,
    getListHandler,
    createCardHandler,
} from './cards';
import {
    saveSessionResultHandler,
    getStudyWordsHandler,
} from './study';
import {
    deleteDictionaryHandler,
    getDictionaryByIdHandler,
    getDictionaryListHandler,
    createDictionaryHandler,
} from './dictionary';

export const cardHandlers = [
    deleteByIdHandler,
    updateHandler,
    getByIdHandler,
    getListHandler,
    createCardHandler,
];

export const studyHandlers = [
    saveSessionResultHandler,
    getStudyWordsHandler,
];

export const dictionaryHandlers = [
    deleteDictionaryHandler,
    getDictionaryByIdHandler,
    getDictionaryListHandler,
    createDictionaryHandler,
]