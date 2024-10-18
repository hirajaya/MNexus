import Artist from '../models/artistModel.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import createToken from '../utils/createToken.js'; 
import asyncHandler from '../middleware/asyncHandler.js';

const generateAID = async () => {
    let AID;
    let artist;
    do {
        const randomDigits = Math.floor(100 + Math.random() * 900);
        AID = `A${randomDigits}`;
        artist = await Artist.findOne({ AID });
    } while (artist);
    return AID;
};

const createArtist = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, artistType, username, password } = req.body;

    const existingArtist = await Artist.findOne({ $or: [{ username }, { email }] });
    if (existingArtist) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    const AID = await generateAID();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newArtist = new Artist({
        AID,
        name,
        email,
        phoneNumber,
        artistType,
        username,
        password: hashedPassword
    });

    await newArtist.save();
    createToken(res, newArtist._id); 
    res.status(201).json(newArtist);
});

const loginArtist = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingArtist = await Artist.findOne({ email });

    if (existingArtist) {
        const isPasswordValid = await bcrypt.compare(password, existingArtist.password);
        if (isPasswordValid) {
            createToken(res, existingArtist._id); 

            return res.status(200).json({
                AID: existingArtist.AID,
                name: existingArtist.name,
                email: existingArtist.email,
                phoneNumber: existingArtist.phoneNumber,
                artistType: existingArtist.artistType,
                username: existingArtist.username
            });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } else {
        return res.status(404).json({ message: "Artist not found" });
    }
});

const logoutCurrentArtist = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

const getAllArtists = asyncHandler(async (req, res) => {
    const artists = await Artist.find();
    res.json(artists);
});

const getArtistByAID = asyncHandler(async (req, res) => {
    const artist = await Artist.findOne({ AID: req.params.AID });
    if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
});

const updateArtistByAID = asyncHandler(async (req, res) => {
    const updatedArtist = await Artist.findOneAndUpdate({ AID: req.params.AID }, req.body, {
        new: true,
    });
    if (!updatedArtist) {
        return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(updatedArtist);
});

const updateCurrentArtistProfile = asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.artist._id);

    if (artist) {
        artist.username = req.body.username || artist.username;
        artist.email = req.body.email || artist.email;
        artist.phoneNumber = req.body.phoneNumber || artist.phoneNumber;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            artist.password = hashedPassword;
        }

const updatedArtist = await artist.save();
        res.json({
            AID: updatedArtist.AID,
            username: updatedArtist.username,
            email: updatedArtist.email,
            phoneNumber: updatedArtist.phoneNumber,
            artistType: updatedArtist.artistType
        });
    } else {
        res.status(404);
        throw new Error("Artist not found");
    }
});

const deleteArtistByAID = asyncHandler(async (req, res) => {
    const artist = await Artist.findOneAndDelete({ AID: req.params.AID });
    if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
    }
    res.json({ message: 'Artist deleted' });
});

export {
    createArtist,
    loginArtist,
    logoutCurrentArtist,
    getAllArtists,
    getArtistByAID,
    updateArtistByAID,
    updateCurrentArtistProfile,
    deleteArtistByAID
};
