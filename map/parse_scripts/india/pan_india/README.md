Steps for parsing the [Pan-India data](https://drive.google.com/drive/u/5/folders/1o1Wok0DaA_cbp3QY1AOCvPssLXPyWmQf):

1. Download the raw `.xlsx` files into the `_raw_data` folder
1. Run `python 1_extract_sheets.py` which will extract `.csv`'s into the `input_files` folder
1. Run `python 2_data_parse.py -i input_files` which will parse `.csv`'s into a folder like `parsed_output_...` (if you get an error about API keys, reach out to Shayan)
1. Run `python 3_data_merge.py` which will merge all the parsed `.csv`s from a given `parsed_output_...` folder to `data_clean.csv` and `data_clean.json`
1. Treat yourself 🎉
