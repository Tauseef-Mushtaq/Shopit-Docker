class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };
    const fieldsToRemove = ['keyword', 'page'];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    const queryObj = {};

    // Convert fields with [gte], [lte] etc. to nested MongoDB format
    Object.keys(queryCopy).forEach((key) => {
      const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        queryObj[field] = queryObj[field] || {};
        queryObj[field][operator] = Number(queryCopy[key]); // convert to number
      } else {
        queryObj[key] = queryCopy[key];
      }
    });

    this.query = this.query.find(queryObj);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
