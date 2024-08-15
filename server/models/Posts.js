module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //ASSSOCIATING OUR POST TABLE TO COMMENTS
  Posts.associate=(models)=>{
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",//When the post gets deleted. it will delete itw coments also

    });
  };

  return Posts;
};
