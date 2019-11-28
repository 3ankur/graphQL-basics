const graphql = require("graphql");
const _ = require("lodash");
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID } = graphql;


const books = [
    {id:"1",name:"The Javascript",genre:"Programming",authorId:"1"},
    {id:"2",name:"5 Points Someone",genre:"Novel",authorId:2},
    {id:"3",name:"The Power of Positive Mind",genre:"Motivation",authorId:3}
];

const authors = [
    {id:"1",name:"Nepolian Hills",age:45},
    {id:"2",name:"Brendrem NIkolas",age:65},
    {id:"3",name:"Siaon T",age:41},
];

 const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve:(parent,args)=>{
                console.log(parent);
                return _.find(authors,{id:parent.authorId})
            }
        },
        
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLString}
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
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>{
                return _.find(authors,{id:args.id})
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});