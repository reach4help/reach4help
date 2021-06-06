# How to run:
# REACT_APP_GMAPS_API_KEY=<api_key> python data_parse.py

# Medicines (Remdesivir and Others)
## Distributor Name,    -> Distributor Name
## Medicine name,	    -> Description (append)
## Area,                -> Location
## Contact,             -> Distributor Contact (Phone)
## Any other details    -> Description (append)
# Oxygen
## Distributor Name,	-> Distributor Name
## Area,	            -> Location
## Mobile no.,          -> Distributor Contact (Phone)
## Any other details    -> Description (append)
# Hospital Beds
## Hospital Name,       -> Distributor Name
## Area,                -> Location
## Contact ,            -> Distributor Contact (Phone)
## Any other details,   -> Description (append)
# Plasma/ Blood
## Blood group,         -> Description (append)
## Area,                -> Location
## Name,                -> Distributor Name
## Contact,             -> Distributor Contact (Phone)
## Any other details,	-> Description (append)
# Tiffin Services
## Name,                -> Distributor Name
## Contact ,            -> Distributor Contact (Phone)
## Area,                -> Location
## Any other details    -> Description (append)
# Quarantine Centres
## Name,                -> Distributor Name
## Area,                -> Location
## Contact ,            -> Distributor Contact (Phone)
## Cost per day,        -> Description (append)
## Any other details	-> Description (append)
# Other Miscelleanous Services
## Name,                -> Distributor Name
## Area,                -> Location
## Contact ,            -> Distributor Contact (Phone)
## Any other details    -> Description (append)

# Columns to add to final output:
## General Area (State) -> 'Delhi'
## Services Offered -> Use the category as a service

import csv
import json
import googlemaps
import os
import pandas as pd
import openpyxl
import phonenumbers
import sys
import getopt
import datetime
from dotenv import load_dotenv

load_dotenv("../../.env")

gmaps_api_key = os.environ.get("GMAPS_API_KEY")
gmaps = googlemaps.Client(key=gmaps_api_key)

# Uses google maps api to retrieve lat long iniformation about a location
# returns an array of [lat, lng] coordinates. Float if the location exists, None if it doesn't
def extract_lat_lng(geocode_result):
    if geocode_result != []:
        return [
            geocode_result[0]["geometry"]["location"]["lat"],
            geocode_result[0]["geometry"]["location"]["lng"],
        ]
    return [None, None]


def extract_state(geocode_result):
    if geocode_result != []:
        for result in geocode_result:
            for addr in result["address_components"][::-1]:
                if "administrative_area_level_1" in addr["types"]:
                    return addr["long_name"]


def extract_phone_contact(phone_string):
    phone_numbers = []
    for match in phonenumbers.PhoneNumberMatcher(phone_string, region="IN"):
        num = phonenumbers.parse(match.raw_string, "IN")
        num = phonenumbers.format_number(num, phonenumbers.PhoneNumberFormat.E164)
        phone_numbers.append(num)
    return phone_numbers


def format_description(header, string):
    # If the notes_string is empty, don't add it to the description
    if string:
        if header == "Any other details":
            return "Notes" + ": " + string
        else:
            return header + ": " + string


# category: String
# headers: List[String]
# data_values: List[String]
# Converts data from a row into a dict of multiple items.
# The number of items in the output corresponds to the number of nonempty categories in the row.
def convert_item_to_dict(category, headers, state, city, data_values):
    header_map = {
        "Distributor Name": "Distributor Name",
        "Hospital Name": "Distributor Name",
        "Name": "Distributor Name",
        "Area": "Location",
        "Contact Person": "Description",  # Manually fill back into appropriate field
        "Contact Name": "Description",  # Manually fill back into appropriate field
        "Contact": "Distributor Contact (Phone)",
        "Contact ": "Distributor Contact (Phone)",
        "Mobile no.": "Distributor Contact (Phone)",
        "Mobile No.": "Distributor Contact (Phone)",
        "Medicine name": "Description",
        "Cost per day": "Description",
        "Blood group": "Description",
        "Any other details": "Description",
    }

    item_dict = {
        "General Area (State)": state,
        "General Area (City)": city,
        "Services Offered": category,
        "Description": [],
        "Marked for Cleaning": None,  # we manually set this as False to be reparsed
    }

    j = 0
    for data in data_values:
        data = data.strip()
        key = header_map[headers[j]]

        if key == "Distributor Name":
            item_dict[key] = data.title()
        elif key == "Description":
            desc = format_description(headers[j], data)
            if desc:
                item_dict[key].append(desc)
        elif key == "Distributor Contact (Phone)":
            item_dict[key] = extract_phone_contact(data)
        elif key == "Location":
            # Sorry for making this so messy, TODO: move this logic into a separate function
            # If keywords like "Oxygen" or "Cylinder" pop up that shouldn't be in the location, let's mark this for cleaning
            if any(fluff in data for fluff in ["Oxygen", "Cylinder"]):
                item_dict["Marked for Cleaning"] = True

            geo_search_string = data
            # If location is empty, try using the name (mark it as well to be sure)
            if not data and "Distributor Name" in item_dict:
                geo_search_string = item_dict["Distributor Name"]
                item_dict["Marked for Cleaning"] = True

            # Commenting out functionality for location searching since we do it more effecitvely in a further step
            # If the city isn't already included, add it (helps with getting the location via google)
            # if item_dict["General Area (City)"] not in data:
            #     geocode_result = gmaps.geocode(
            #         geo_search_string + f" {city}", region="IN"
            #     )
            # else:
            #     geocode_result = gmaps.geocode(geo_search_string, region="IN")

            # item_dict["lat"], item_dict["lng"] = extract_lat_lng(geocode_result)

            # If Google's state is mismatched with the given state, then the given location is possibly wrong, so let's mark it for cleaning
            # if extract_state(geocode_result) != item_dict["General Area (State)"]:
            #     item_dict["Marked for Cleaning"] = True

            # If the location is empty, then also mark it for cleaning
            if not data:
                item_dict["Marked for Cleaning"] = True

            item_dict[key] = data.title()
        else:
            item_dict[key] = data

        j += 1

    # Since description text can have commas, use a separate delimiter (easy to swap out later)
    item_dict["Description"] = " ; ".join(item_dict["Description"])
    return item_dict


def extract_categories_and_headers(row):
    categories = [
        "Medicines",
        "Oxygen",
        "Hospital Beds",
        "Plasma / Blood",
        "Tiffin Services",
        "Quarantine Centres",
        "Other",
    ]

    headers = []
    categories_and_headers = []
    cat_number = 0

    for header in row:

        if header != "":
            headers.append(header)
        else:

            categories_and_headers.append([categories[cat_number], headers])
            if cat_number < len(categories) - 1:
                cat_number += 1
            headers = []

    categories_and_headers.append([categories[cat_number], headers])
    return categories_and_headers


def main(argv):
    inputfolder = ""
    try:
        opts, args = getopt.getopt(argv, "hi:", ["ifolder="])
    except getopt.GetoptError:
        print("test.py -i <inputfolder>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("test.py -i <inputfolder>")
            sys.exit()
        elif opt in ("-i", "--ifolder"):
            inputfolder = arg

    current_time = datetime.datetime.now()

    output_dir = f"parsed_output_{current_time}"
    os.mkdir(output_dir)

    input_dir_files = sorted(os.listdir(inputfolder))
    print(input_dir_files)
    for file in input_dir_files:
        i = 0
        json_i = 0
        final_dict = {}

        naive_name, file_ext = file.split(".")
        naive_state_name, naive_city_name = naive_name.split(" - ")
        if file_ext == "xls" or file_ext == "xlsx":
            xls = pd.ExcelFile(f"{inputfolder}/{file}")
            sheet_names = xls.sheet_names
            sheet_to_df_map = {}
            for sheet in sheet_names:
                sheet_to_df_map[sheet] = xls.parse(sheet)
            # *** This parsing section is incomplete ****

        else:
            with open(f"{inputfolder}/{file}", errors="ignore") as csvfile:
                datareader = csv.reader(csvfile)
                print(f"Starting parse for {file}...")

                for row in datareader:
                    i += 1

                    if i == 4:
                        categories_and_headers = extract_categories_and_headers(row)
                    elif i > 4:
                        starting_column = 0

                        for category_pair in categories_and_headers:
                            num_of_headers = len(category_pair[1])
                            data_values = []

                            for num in range(
                                starting_column, starting_column + num_of_headers
                            ):
                                data_values.append(row[num])

                            if "".join(data_values) != "":
                                item_dict = convert_item_to_dict(
                                    category_pair[0],
                                    category_pair[1],
                                    naive_state_name,
                                    naive_city_name,
                                    data_values,
                                )
                                final_dict[json_i] = item_dict
                                json_i += 1

                            starting_column += num_of_headers + 1

                    # This print statement is purely a visual to let you know the script is still running
                    if i % 100 == 0:
                        print("Parsed " + str(i) + " rows. Still parsing...")
                        break

            # Export clean data to separate file
            # json.dump(final_dict, open("delhi_clean.json", "w+"), sort_keys=True, indent=4)
            #
            # Export clean data to csv for now (easier to look at quickly)
            output_file_name = (
                f"{output_dir}/{naive_state_name}_{naive_city_name}_clean.csv"
            )
            pd.DataFrame.from_dict(final_dict).transpose().to_csv(
                output_file_name, index=False
            )
            print(f"Output stored in {output_file_name}")


if __name__ == "__main__":
    main(sys.argv[1:])

