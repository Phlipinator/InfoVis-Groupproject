import numpy as np
import csv
import pandas as pd



def main():

    # -------------------------------------------------------------------------------------------------------------
    # DATA PREPROCESSING
    # -------------------------------------------------------------------------------------------------------------
    data = pd.read_csv('assets/geoc_inv.txt', index_col=0)
    data.reset_index(inplace=True, drop=True)

    print(data)

    # data['group'] = data.index // 500000
    # # data[data.group == 0].to_csv('geoc_inv_group_0.csv')
    # # print("small csv written")

if __name__ == "__main__":
    main()