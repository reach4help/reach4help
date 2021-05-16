# python
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

# category_and_headers is an array like this: ['category1', ['h1', 'h2', 'h3']]
# data values is an array
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
    'Any other details': 'Description',
    'Cost per day': 'Description',
    'Blood group': 'Description', 

  }
  item_dict = {'General Area (State)': 'Delhi', 'Services Offered': category, 'Description': ''}
  j = 0
  for data in data_values:
    if header_map[headers[j]] == 'Description':
      item_dict[header_map[headers[j]]] += (headers[j] + ': ' + data + ', ')
    else:
      item_dict[header_map[headers[j]]] = data
    j += 1
  return item_dict

i = 0
json_i = 0
final_dict = {}

with open('Delhi.csv') as csvfile:
  delhireader = csv.reader(csvfile)
  for row in delhireader:
    i += 1 
    if i == 4:
      categories = ["Medicines", 
      "Oxygen",
      "Hospital Beds",
      "Plasma / Blood",
      "Tiffin Services",
      "Quarantine Centres", 
      "Other"]
      
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

print(json.dumps(final_dict, sort_keys=True, indent=4))