import { nanoid } from 'nanoid';

const shortid = len => {
    const id = nanoid(len);
    return id;
};

export default shortid;
