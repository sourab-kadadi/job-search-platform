import * as mongoose from 'mongoose';

const basicDetails = {
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  company_status: {
    type: String,
    trim: true,
  },
  company_roc: {
    type: String,
    trim: true,
  },
  company_reg_no: {
    type: String,
    trim: true,
  },
  company_category: {
    type: String,
    trim: true,
  },
  company_sub_category: {
    type: String,
    trim: true,
  },
  company_class: {
    type: String,
    trim: true,
  },
  company_dateof_incorporation: {
    type: String,
    trim: true,
  },
  company_age: {
    type: String,
    trim: true,
  },
  company_activity: {
    type: String,
    trim: true,
  },
  company_number_members: {
    type: String,
    trim: true,
  },
};

const sharedCapital = {
    company_authorised_capital: {
        type: String,
        trim: true,
      },
    company_paidup_cap: {
        type: String,
        trim: true,
      }
}

const listAnnualCompliance = {
    company_listing_status: {
        type: String,
        trim: true,
      },
    company_last_agm: {
        type: String,
        trim: true,
      },
    company_latest_blst: {
        type: String,
        trim: true,
      }
  }

  const companyDetails = {
    company_email:  {
        type: String,
        trim: true,
      },
    company_website: {
        type: String,
        trim: true,
      },
    company_address: {
        type: String,
        trim: true,
      }
  }

  const directerDetails = {
    director_din: {
        type: String,
        trim: true,
      },
    director_name: {
        type: String,
        trim: true,
      },
    director_designation: {
        type: String,
        trim: true,
      },
      director_appointment_date: {
        type: String,
        trim: true,
      }
  }

  const prosecutionDetails = {
    company_sno: {
        type: String,
        trim: true,
      },
    company_defaulting_entity: {
        type: String,
        trim: true,
      },
    company_court_name: {
        type: String,
        trim: true,
      },
    company_prosecution_section: {
        type: String,
        trim: true,
      },
    company_date_of_order: {
        type: String,
        trim: true,
      },
    company_status: {
        type: String,
        trim: true,
      },
  }

  const chargesAndBorrowings = {
    company_chargeid: {
        type: String,
        trim: true,
      },
    company_creation_date: {
        type: String,
        trim: true,
      },
    company_closure_date: {
        type: String,
        trim: true,
      },
    company_assets_undercharge: {
        type: String,
        trim: true,
      },
    company_amount: {
        type: String,
        trim: true,
      },
    company_chargeholder: {
        type: String,
        trim: true,
      },
  }

  const establishmentName = {
    establishment_name: {
        type: String,
        trim: true,
      },
    establishment_city: {
        type: String,
        trim: true,
      },
    establishment_pincode: {
        type: String,
        trim: true,
      },
    establishment_address: {
        type: String,
        trim: true,
      },
  }

export const finCompanyDetails = new mongoose.Schema({
  CIN: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  basic_details: {
      type: basicDetails,
      default: undefined,
  },
  share_capital: {
      type: sharedCapital,
      default: undefined,
  },
  listing_and_annual_compliance: {
      type: listAnnualCompliance,
      default: undefined,
  },
  company_contactmail_and_address: {
      type: companyDetails,
      default: undefined,
  },
  directors_details: {
    type: [directerDetails],
    default: undefined,
  },
  prosecution_details: {
      type: [prosecutionDetails],
      default: undefined,
  },
  charges_and_borrowings: {
      type: [chargesAndBorrowings],
      default: undefined,
  },
  establishment_name: {
      type: [establishmentName],
      default: undefined,
  }
},  { timestamps: true });


finCompanyDetails.index({CIN: 1, "basic_details.company_name": 1});
finCompanyDetails.index({"basic_details.company_name": 1});



finCompanyDetails.on('index', function(error) {
    console.log(error.message); 
  });