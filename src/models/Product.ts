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
            defaultValue: null
        },
        name: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        }
    }, {
		initialAutoIncrement: 1000,
        modelName: "Product",
        tableName: "Product",
        timestamps: false
	});
    
    return Product;
}