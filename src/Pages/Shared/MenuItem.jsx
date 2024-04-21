
const MenuItem = ({ item }) => {
    const {image, price, recipe, name} = item;
    return (
        <div className="flex gap-2">
            <img src={image} alt="" className="w-[100px]" style={{borderRadius: '0 200px 200px 200px'}} />
            <div>
                <h3 className="uppercase">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;