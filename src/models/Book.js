export default class Book{
    constructor(id = 'new', title = "", descr = "", createdAt = new Date(), image = null){
        this.id = id;
        this.title = title;
        this.descr = descr;
        this.createdAt = createdAt;
        this.image = image;
    }

    /**
     * Get date for display
     * @returns {string}
     */
    getFormattedDate(){
        return this.createdAt.toLocaleDateString();
    }

    /**
     * Clone Book instance
     * @returns {*}
     */
    clone(){
        return Object.assign(new this.constructor(), this);
    }
}
