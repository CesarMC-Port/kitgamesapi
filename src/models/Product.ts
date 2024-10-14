export default (sequelize:any, type:any) => {

    const Product = sequelize.define('Product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        image: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        publicId: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: '' 
        },
        name: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: ''
        }
    }, {
		initialAutoIncrement: 1000,
        modelName: "Product",
        tableName: "Product",
        timestamps: false
	});
    
    return Product;
}