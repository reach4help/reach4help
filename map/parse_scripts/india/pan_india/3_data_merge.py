import os
import pandas as pd
from ast import literal_eval

clean_data_dirs = ["parsed_output_2021-06-07 11:18:58.162689"]
cities_data = []
for data_dir in clean_data_dirs:
    for city_data in sorted(os.listdir(data_dir)):
        try:
            df_city = pd.read_csv(
                os.path.join(data_dir, city_data), keep_default_na=False
            )
            cities_data.append(df_city)
        except pd.errors.EmptyDataError:
            print(f"Note: {city_data} was empty. Skipping.")
            continue  # will skip the rest of the block and move to next file

# Concatenate all the data into one master file
df = pd.concat(cities_data)

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
        "Marked for Cleaning",
    ]
]


# Format latlongs
df["Distributor Contact (Phone)"] = df["Distributor Contact (Phone)"].apply(
    literal_eval
)

df.reset_index(inplace=True)
df.to_csv("data_clean.csv", index=False)
df.to_json("data_clean.json", orient="records")
