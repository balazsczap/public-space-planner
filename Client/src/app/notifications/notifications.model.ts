

export class Notification {
    constructor(public type: string = '',
                public message: string = '',
                public duration: number = 3000,
                public active: string = 'true') {
    }
}
