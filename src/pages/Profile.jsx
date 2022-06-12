import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetail, setChangeDetail] = useState(false);
  const { currentUser } = auth;
  const [form, setForm] = useState({
    name: currentUser.displayName,
    email: currentUser.email,
  });
  const { name, email } = form;
  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not update profile details");
    }
  };
  const clickHandler = () => {
    changeDetail && onSubmit();
    setChangeDetail((prevstate) => {
      return !prevstate;
    });
  };
  const onChange = (e) => {
    setForm((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };
  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };
  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={logoutHandler}>
            Logout
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Detials</p>
            <p className="changePersonalDetails" onClick={clickHandler}>
              {changeDetail ? "done" : "change"}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                onChange={onChange}
                value={name}
                className={!changeDetail ? "profileName" : "profileNameActive"}
                disabled={!changeDetail}
              />
              <input
                type="email"
                id="email"
                onChange={onChange}
                value={email}
                className={
                  !changeDetail ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetail}
              />
            </form>
          </div>
          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home icon" />
            <p>sell or rent homes</p>
            <img src={arrowRight} alt="arrowRight" />
          </Link>
          {!loading && listings?.length > 0 && (
            <>
              <p className="listingText">Your Listings</p>
              <ul>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Profile;
