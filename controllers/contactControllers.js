const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get All Contacts
//@route GET api/contacts
//access PRIVATE
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({userId : req.user.id})
    res.status(200).json(contacts);
})

//@desc Creare New Contact
//@route POST api/contacts
//access PRIVATE
const createContacts = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are Required!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        userId : req.user.id
    })
    res.status(201).json(contact);
})

//@desc Get Contact by ID
//@route GET api/contacts/:id
//access PRIVATE
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
})

//@desc Update Contact
//@route PUT api/contacts/:id
//access PRIVATE
const updateContact = asyncHandler(async(req, res) => {
    console.log(req.body)
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact);
})

//@desc Delete Contact
//@route DELETE api/contacts/:id
//access PRIVATE
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }
    await Contact.findByIdAndRemove(req.params.id)
    res.status(200).json(contact);
})


module.exports = { getContacts, createContacts, getContact, updateContact, deleteContact }