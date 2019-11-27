const graphql = require("graphql");
const _ = require("lodash");
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID } = graphql;


const books = [
    {id:"1",name:"The Javascript",genre:"Programming"},
    {id:"2",name:"5 Points Someone",genre:"Novel"},
    {id:"3",name:"The Power of Positive Mind",genre:"Motivation"}
];

 const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:"root",
    type:"RootQueryType",
    fields:{
        book:{
            type:BookType,
        args:{id:{type:GraphQLID}},
        resolve:(parent,args)=>{
            return  _.find(books, { id: args.id });
        }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});