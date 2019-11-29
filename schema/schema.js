const graphql = require("graphql");
const _ = require("lodash");
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLList,GraphQLInt,GraphQLNonNull } = graphql;

const Book= require("../models/book");
const Author = require("../models/author");


//3ankurv
const books = [
    {id:"1",name:"The Javascript",genre:"Programming",authorId:"1"},
    {id:"2",name:"5 Points Someone",genre:"Novel",authorId:"1"},
    {id:"2",name:"5 Points Someone",genre:"Novel",authorId:"1"},
    {id:"2",name:"5 Points Someone",genre:"Novel",authorId:"1"},
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
              //  return _.find(authors,{id:parent.authorId})
              return Author.findById(parent.authorId);
            }
        },
        
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLString},
        books:{
            type:new GraphQLList(BookType),
            resolve:(parent,args)=>{
                console.log(parent,args);
                //return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
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
          //  return  _.find(books, { id: args.id });
          return  Book.findById(args.id);

        }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>{
               // return _.find(authors,{id:args.id})
              return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve:(parent,args)=>{
                return Book.find({});;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve:(parent,args)=>{
                return Author.find({});
            }
        }
        
    }
});


const Mutation = new GraphQLObjectType({
    name:"Mutation",
    //type
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
                
                },
                resolve:(parent,args)=>{
                    let author = new Author({
                        name:args.name,
                        age:args.age
                    });
                    return author.save();
                }
            },
            addBook:{
                type:BookType,
                args:{
                    name:{type: new GraphQLNonNull( GraphQLString)},
                    genre:{type: new GraphQLNonNull( GraphQLString)},
                    authorId:{type: new GraphQLNonNull(GraphQLID)}
                },
                resolve:(parent,args)=>{
                    let book = new Book({
                        name:args.name,
                        genre:args.genre,
                        authorId:args.authorId
                    });
                    
                 return book.save();
                }
            }
        }

});

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});