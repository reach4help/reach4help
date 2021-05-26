# How to run: streamlit run delhi_clean_dashboard.py
import pandas as pd
import numpy as np
import streamlit as st
from ast import literal_eval
import os


"""
    # Reach4Help Pan-India Resources Data Dashboard (Delhi)
"""

# Import data
# df = pd.read_json("../data_clean.json").transpose()
df = pd.read_csv(
    "https://raw.githubusercontent.com/reach4help/reach4help/map/map/parse_scripts/data_clean.csv",
    keep_default_na=False,
)

# Rearrange columns
df = df[
    [
        "Distributor Name",
        "Description",
        "Services Offered",
        "Distributor Contact (Phone)",
        "General Area (State)",
        "General Area (City)",
        "Location",
        "lat",
        "lng",
        "Marked for Cleaning",
    ]
]

# Format columns
df["lat"] = pd.to_numeric(df["lat"], errors="coerce")
df["lng"] = pd.to_numeric(df["lng"], errors="coerce")
df["Distributor Contact (Phone)"] = df["Distributor Contact (Phone)"].apply(
    literal_eval
)


# Query all fields by search string
search_string = st.sidebar.text_input("Search any field")
df = df[df.apply(lambda row: search_string.lower() in str(row).lower(), axis=1)]


# Query by state
states = list(df["General Area (State)"].unique())
selected_states = st.sidebar.multiselect("State", states, states)
df = df[df["General Area (State)"].isin(selected_states)]

# Query by service category
services = list(df["Services Offered"].unique())
selected_services = st.sidebar.multiselect("Services", services, services)
df = df[df["Services Offered"].isin(selected_services)]


"## **Raw Data**"
st.dataframe(df)
f"**{df.shape[0]} rows** by **{df.shape[1]} columns**"

### DEMO MAP ###
from streamlit_folium import folium_static
import folium

"## **Map**"

df_map = df.dropna(subset=["lat", "lng"])
if len(df_map):
    midpoint = [df_map["lat"].mean(), df_map["lng"].mean()]
    india_map = folium.Map(location=midpoint)

    sw = df_map[["lat", "lng"]].min().values.tolist()
    ne = df_map[["lat", "lng"]].max().values.tolist()

    india_map.fit_bounds([sw, ne])

    for index, marker in df_map.iterrows():
        location = [marker["lat"], marker["lng"]]

        popup_html = f"""
            <p style="font-family: sans-serif; font-size: .8em"> <b>Distributor Name: </b> {marker["Distributor Name"]} </p>
            <p style="font-family: sans-serif; font-size: .8em"> <b>Description: </b> {marker["Description"]} </p>
            <p style="font-family: sans-serif; font-size: .8em"> <b>Location: </b> {marker["Location"]} </p>
        """
        iframe = folium.IFrame(popup_html, width=200, height=100)
        popup = folium.Popup(iframe)
        folium.CircleMarker(
            location,
            radius=5,
            color="#F63366",
            fill=True,
            fill_opacity=0.7,
            popup=popup,
        ).add_to(india_map)

    # call to render Folium map in Streamlit
    folium_static(india_map)
    f"Showing **{len(df_map)} markers** with location data out of **{len(df)} total**"
else:
    "No markers with location data"
