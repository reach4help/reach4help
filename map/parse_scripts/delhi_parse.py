# How to run:
# REACT_APP_GMAPS_API_KEY=<api_key> python delhi_parse.py

# Medicines (Remdesivir and Others)
  # Distributor Name,   -> Distributor Name
  # Medicine name,	    -> Description (append)
  # Area,               -> Location
  # Contact,            -> Distributor Contact (Phone)
  # Any other details	  -> Description (append)
# Oxygen					
  # Distributor Name,	  -> Distributor Name
  # Area,	              -> Location
  # Mobile no.,         -> Distributor Contact (Phone)
  # Any other details   -> Description (append)
# Hospital Beds			
  # Hospital Name,      -> Distributor Name
  # Area,               -> Location
  # Contact ,           -> Distributor Contact (Phone)
  # Any other details,  -> Description (append)
# Plasma/ Blood						
  # Blood group,        -> Description (append)
  # Area,               -> Location
  # Name,               -> Distributor Name
  # Contact,            -> Distributor Contact (Phone)
  # Any other details,	-> Description (append)
# Tiffin Services			
  # Name,               -> Distributor Name
  # Contact ,           -> Distributor Contact (Phone)
  # Area,               -> Location
  # Any other details   -> Description (append)	
# Quarantine Centres	
  # Name,               -> Distributor Name
  # Area,               -> Location
  # Contact ,           -> Distributor Contact (Phone)
  # Cost per day,       -> Description (append)
  # Any other details	  -> Description (append)				
# Other Miscelleanous Services			
  # Name,               -> Distributor Name
  # Area,               -> Location
  # Contact ,           -> Distributor Contact (Phone)
  # Any other details   -> Description (append)

# Columns to add to final output:
  # General Area (State) -> 'Delhi'
  # Services Offered -> Use the category as a service

import csv
import json
import googlemaps
import os
gmaps_api_key = os.environ.get('REACT_APP_GMAPS_API_KEY')
gmaps = googlemaps.Client(key=gmaps_api_key)

# Uses google maps api to retrieve lat long iniformation about a location
# returns an array of [lat, lng] coordinates. Float if the location exists, None if it doesn't
def extract_lat_lng(location_string):
      if location_string == '':
        return [None, None]
      else:
        geocode_result = gmaps.geocode(location_string, region='IN')
        if geocode_result != []:
          return [
            geocode_result[0]['geometry']['location']['lat'],
            geocode_result[0]['geometry']['location']['lng']
          ]
        else:
          return [None, None]

def extract_phone_contact(phone_string):
  if ';' in phone_string:
    return phone_string.split(';')
  elif ',' in phone_string:
    return phone_string.split(',')
  else:
    return [phone_string]

def format_description(header, notes_string):
  if notes_string: # If the notes_string is empty, don't add it to the description
    if header == 'Any other details':
      return ('Notes' + ': ' + notes_string + ', ')
    else:
      return (header + ': ' + notes_string + ', ')
  return ''

# category: String
# headers: List[String]
# data_values: List[String]
# Converts data from a row into a dict of multiple items. 
# The number of items in the output corresponds to the number of nonempty categories in the row.
def convert_item_to_dict(category, headers, data_values):
  header_map = {
    'Distributor Name': 'Distributor Name', 
    'Hospital Name': 'Distributor Name',
    'Name': 'Distributor Name',
    'Area': 'Location',
    'Contact': 'Distributor Contact (Phone)',
    'Contact ': 'Distributor Contact (Phone)',
    'Mobile no.': 'Distributor Contact (Phone)',
    'Medicine name': 'Description',
    'Cost per day': 'Description',
    'Blood group': 'Description',
    'Any other details': 'Description'
  }

  item_dict = {
    'General Area (State)': 'Delhi', 
    'Services Offered': category, 
    'Description': ''
  }

  j = 0
  for data in data_values:
    key = header_map[headers[j]]
    if key == 'Description':
      item_dict[key] += format_description(headers[j], data)
    elif key == 'Distributor Contact (Phone)':
      item_dict[key] = extract_phone_contact(data)
    elif key == 'Location':
      item_dict['lat'], item_dict['lng'] = extract_lat_lng(data + ' ' + item_dict['General Area (State)'])
      item_dict[key] = data
    else:
      item_dict[key] = data
    j += 1
  return item_dict

i = 0
json_i = 0
final_dict = {}

with open('Delhi.csv', encoding='utf-8') as csvfile:
  delhireader = csv.reader(csvfile)
  print('Starting parse...')
  for row in delhireader:
    i += 1 

    if i == 4:
      categories = [
        "Medicines", 
        "Oxygen",
        "Hospital Beds",
        "Plasma / Blood",
        "Tiffin Services",
        "Quarantine Centres", 
        "Other"
      ]
      
      headers = []
      categories_and_headers = []
      cat_number = 0

      for header in row:
        if header != '':
          headers.append(header)
        else:
          categories_and_headers.append([categories[cat_number], headers])
          cat_number+=1
          headers = []

      categories_and_headers.append([categories[cat_number], headers])
    elif i > 4:
      starting_column = 0

      for category_pair in categories_and_headers:
        num_of_headers = len(category_pair[1])
        data_values = []

        for num in range(starting_column, starting_column + num_of_headers):
          data_values.append(row[num])
        
        if ''.join(data_values) != '':
          item_dict = convert_item_to_dict(category_pair[0], category_pair[1], data_values)
          final_dict[json_i] = item_dict
          json_i += 1

        starting_column += num_of_headers + 1

    # This print statement is purely a visual to let you know the script is still running
    if i%100 == 0:
      print('Parsed ' + str(i) + ' rows. Still parsing...')

# Export clean data to separate file
json.dump(final_dict, open('delhi_clean.json', 'w+'), sort_keys=True, indent=4)
